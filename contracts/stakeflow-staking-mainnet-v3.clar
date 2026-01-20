;; StakeFlow Staking Contract V3
;; Stake NFTs to earn STF token rewards
;; MAINNET VERSION - Uses authorized-callers map to avoid circular dependencies

;; Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-NOT-TOKEN-OWNER (err u101))
(define-constant ERR-ALREADY-STAKED (err u102))
(define-constant ERR-NOT-STAKED (err u103))
(define-constant ERR-TRANSFER-FAILED (err u104))

;; Authorized callers map (set by admin after deployment)
(define-map authorized-callers principal bool)

;; Data structures
(define-map staked-nfts 
  { token-id: uint }
  { owner: principal, staked-at: uint, last-claim: uint }
)

;; Track total staked NFTs
(define-data-var total-staked uint u0)
(define-data-var staking-paused bool false)

;; Check if caller is authorized
(define-private (is-authorized-caller (caller principal))
  (default-to false (map-get? authorized-callers caller))
)

;; ---------------------------------------------------------
;; Staking Functions
;; ---------------------------------------------------------

(define-public (stake-nft (token-id uint))
  (let
    (
      (nft-owner (unwrap! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-nft-mainnet-v2 get-owner token-id) ERR-NOT-TOKEN-OWNER))
    )
    (asserts! (not (var-get staking-paused)) ERR-NOT-AUTHORIZED)
    (asserts! (is-eq tx-sender (unwrap! nft-owner ERR-NOT-TOKEN-OWNER)) ERR-NOT-TOKEN-OWNER)
    (asserts! (is-none (map-get? staked-nfts { token-id: token-id })) ERR-ALREADY-STAKED)
    (try! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-nft-mainnet-v2 transfer token-id tx-sender (as-contract tx-sender)))
    (map-set staked-nfts
      { token-id: token-id }
      { owner: tx-sender, staked-at: block-height, last-claim: block-height }
    )
    (var-set total-staked (+ (var-get total-staked) u1))
    (ok true)
  )
)

;; Called by authorized unstake contract
(define-public (release-nft (token-id uint) (recipient principal))
  (let
    (
      (stake-info (unwrap! (map-get? staked-nfts { token-id: token-id }) ERR-NOT-STAKED))
    )
    (asserts! (is-authorized-caller contract-caller) ERR-NOT-AUTHORIZED)
    (asserts! (is-eq recipient (get owner stake-info)) ERR-NOT-AUTHORIZED)
    (try! (as-contract (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-nft-mainnet-v2 transfer token-id tx-sender recipient)))
    (map-delete staked-nfts { token-id: token-id })
    (var-set total-staked (- (var-get total-staked) u1))
    (ok true)
  )
)

;; Called by authorized rewards contract
(define-public (update-last-claim (token-id uint))
  (let
    (
      (stake-info (unwrap! (map-get? staked-nfts { token-id: token-id }) ERR-NOT-STAKED))
    )
    (asserts! (is-authorized-caller contract-caller) ERR-NOT-AUTHORIZED)
    (map-set staked-nfts
      { token-id: token-id }
      (merge stake-info { last-claim: block-height })
    )
    (ok true)
  )
)

;; ---------------------------------------------------------
;; Read-only Functions
;; ---------------------------------------------------------

(define-read-only (get-stake-info (token-id uint))
  (map-get? staked-nfts { token-id: token-id })
)

(define-read-only (is-staked (token-id uint))
  (is-some (map-get? staked-nfts { token-id: token-id }))
)

(define-read-only (get-staker (token-id uint))
  (match (map-get? staked-nfts { token-id: token-id })
    stake-info (some (get owner stake-info))
    none
  )
)

(define-read-only (get-total-staked)
  (var-get total-staked)
)

(define-read-only (is-caller-authorized (caller principal))
  (is-authorized-caller caller)
)

;; ---------------------------------------------------------
;; Admin Functions
;; ---------------------------------------------------------

(define-public (set-authorized-caller (caller principal) (authorized bool))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (ok (map-set authorized-callers caller authorized))
  )
)

(define-public (set-staking-paused (paused bool))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (ok (var-set staking-paused paused))
  )
)
