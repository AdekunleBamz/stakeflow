;; StakeFlow Unstake Contract V4
;; Unstake NFTs and claim rewards (0.001 STX fee)
;; MAINNET VERSION - References v3 staking and rewards by full address

;; Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant TREASURY 'SP1ZYBVXD24AG7HNQ9PXB7TBCY2FD4YWT307FRKA3)
(define-constant UNSTAKE-FEE u1000)
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-NOT-STAKED (err u101))
(define-constant ERR-NOT-OWNER (err u102))
(define-constant ERR-TRANSFER-FAILED (err u103))

;; Data vars
(define-data-var unstake-fee uint UNSTAKE-FEE)
(define-data-var unstaking-paused bool false)
(define-data-var total-fees-collected uint u0)

;; ---------------------------------------------------------
;; Unstake Functions
;; ---------------------------------------------------------

(define-public (unstake-nft (token-id uint))
  (let
    (
      (stake-info (unwrap! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet-v3 get-stake-info token-id) ERR-NOT-STAKED))
      (staker (get owner stake-info))
    )
    (asserts! (not (var-get unstaking-paused)) ERR-NOT-AUTHORIZED)
    (asserts! (is-eq tx-sender staker) ERR-NOT-OWNER)
    (try! (stx-transfer? (var-get unstake-fee) tx-sender TREASURY))
    (try! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-rewards-mainnet-v3 claim-and-distribute token-id staker))
    (try! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet-v3 release-nft token-id staker))
    (var-set total-fees-collected (+ (var-get total-fees-collected) (var-get unstake-fee)))
    (ok true)
  )
)

;; Emergency unstake without rewards
(define-public (emergency-unstake (token-id uint))
  (let
    (
      (stake-info (unwrap! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet-v3 get-stake-info token-id) ERR-NOT-STAKED))
      (staker (get owner stake-info))
    )
    (asserts! (is-eq tx-sender staker) ERR-NOT-OWNER)
    (try! (stx-transfer? (var-get unstake-fee) tx-sender TREASURY))
    (try! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet-v3 release-nft token-id staker))
    (var-set total-fees-collected (+ (var-get total-fees-collected) (var-get unstake-fee)))
    (ok true)
  )
)

;; ---------------------------------------------------------
;; Read-only Functions
;; ---------------------------------------------------------

(define-read-only (get-unstake-fee)
  (var-get unstake-fee)
)

(define-read-only (get-total-fees-collected)
  (var-get total-fees-collected)
)

(define-read-only (get-treasury)
  TREASURY
)

;; ---------------------------------------------------------
;; Admin Functions
;; ---------------------------------------------------------

(define-public (set-unstake-fee (new-fee uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (ok (var-set unstake-fee new-fee))
  )
)

(define-public (set-unstaking-paused (paused bool))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (ok (var-set unstaking-paused paused))
  )
)
