;; StakeFlow Rewards Contract V3
;; Calculate and distribute STF token rewards
;; MAINNET VERSION - References staking-v3 by full address

;; Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant REWARD-RATE u1000000)
(define-constant BLOCKS-PER-REWARD u10)
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-NOT-STAKED (err u101))
(define-constant ERR-NO-REWARDS (err u102))
(define-constant ERR-NOT-OWNER (err u103))

;; Authorized callers map
(define-map authorized-callers principal bool)

;; Data vars
(define-data-var reward-rate uint REWARD-RATE)
(define-data-var blocks-per-reward uint BLOCKS-PER-REWARD)
(define-data-var rewards-paused bool false)
(define-data-var total-rewards-distributed uint u0)

(define-private (is-authorized-caller (caller principal))
  (default-to false (map-get? authorized-callers caller))
)

;; ---------------------------------------------------------
;; Reward Calculation
;; ---------------------------------------------------------

(define-read-only (calculate-rewards (token-id uint))
  (let
    (
      (stake-info (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet-v3 get-stake-info token-id))
    )
    (match stake-info
      stake-data
        (let
          (
            (blocks-staked (- block-height (get last-claim stake-data)))
            (reward-periods (/ blocks-staked (var-get blocks-per-reward)))
            (rewards (* reward-periods (var-get reward-rate)))
          )
          rewards
        )
      u0
    )
  )
)

;; ---------------------------------------------------------
;; Claim Functions
;; ---------------------------------------------------------

(define-public (claim-rewards (token-id uint))
  (let
    (
      (stake-info (unwrap! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet-v3 get-stake-info token-id) ERR-NOT-STAKED))
      (staker (get owner stake-info))
      (rewards (calculate-rewards token-id))
    )
    (asserts! (not (var-get rewards-paused)) ERR-NOT-AUTHORIZED)
    (asserts! (is-eq tx-sender staker) ERR-NOT-OWNER)
    (asserts! (> rewards u0) ERR-NO-REWARDS)
    (try! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-token-mainnet mint-for-staking rewards staker))
    (try! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet-v3 update-last-claim token-id))
    (var-set total-rewards-distributed (+ (var-get total-rewards-distributed) rewards))
    (ok rewards)
  )
)

;; Called by authorized unstake contract
(define-public (claim-and-distribute (token-id uint) (recipient principal))
  (let
    (
      (rewards (calculate-rewards token-id))
    )
    (asserts! (is-authorized-caller contract-caller) ERR-NOT-AUTHORIZED)
    (if (> rewards u0)
      (begin
        (try! (contract-call? 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-token-mainnet mint-for-staking rewards recipient))
        (var-set total-rewards-distributed (+ (var-get total-rewards-distributed) rewards))
        (ok rewards)
      )
      (ok u0)
    )
  )
)

;; ---------------------------------------------------------
;; Read-only Functions
;; ---------------------------------------------------------

(define-read-only (get-reward-rate)
  (var-get reward-rate)
)

(define-read-only (get-total-rewards-distributed)
  (var-get total-rewards-distributed)
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

(define-public (set-rewards-paused (paused bool))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (ok (var-set rewards-paused paused))
  )
)
