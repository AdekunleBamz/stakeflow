;; SIP-010 Trait Definition for local development
;; On mainnet, use: 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait

(define-trait sip-010-trait
  (
    ;; Transfer tokens to a recipient
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
    
    ;; Get the token name
    (get-name () (response (string-ascii 32) uint))
    
    ;; Get the token symbol
    (get-symbol () (response (string-ascii 10) uint))
    
    ;; Get the number of decimals
    (get-decimals () (response uint uint))
    
    ;; Get the balance of an account
    (get-balance (principal) (response uint uint))
    
    ;; Get the total supply
    (get-total-supply () (response uint uint))
    
    ;; Get the token URI
    (get-token-uri () (response (optional (string-utf8 256)) uint))
  )
)
