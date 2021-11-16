export const CHECK_FUSD_BALANCE = `
  import FungibleToken from 0xFungibleToken;  
  import FUSD from 0xFUSD;

  pub fun main(addr: Address): UFix64? {
    let account = getAccount(addr);
    if let vaultRef = account.getCapability(/public/fusdBalance).borrow<&FUSD.Vault{FungibleToken.Balance}>() {
      return vaultRef.balance
    } else {
      return nil
    }
  }
`;
