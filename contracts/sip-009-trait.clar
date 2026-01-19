;; SIP-009 Trait Definition for local development
;; On mainnet, use: 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait

(define-trait nft-trait
  (
    ;; Get the last token ID
    (get-last-token-id () (response uint uint))
    
    ;; Get the token URI for a specific token
    (get-token-uri (uint) (response (optional (string-ascii 256)) uint))
    
    ;; Get the owner of a token
    (get-owner (uint) (response (optional principal) uint))
    
    ;; Transfer token
    (transfer (uint principal principal) (response bool uint))
  )
)
