import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CollectionCreated,
  DepositOfFunds,
  ItemCreated,
  ItemListedForSale,
  ItemWithdrawnFromSale,
  MarketplaceApprovedForToken,
  MarketplacePermissionsRevoked,
  OfferMade,
  OfferRejected,
  OfferWithdrawn,
  OwnershipTransferred,
  TradeConfirmed,
  WithdrawalOfFunds
} from "../generated/Marketplace/Marketplace"

export function createCollectionCreatedEvent(
  collectionName: string,
  collectionSymbol: string,
  collectionAddress: Address,
  user: Address
): CollectionCreated {
  let collectionCreatedEvent = changetype<CollectionCreated>(newMockEvent())

  collectionCreatedEvent.parameters = new Array()

  collectionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "collectionName",
      ethereum.Value.fromString(collectionName)
    )
  )
  collectionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "collectionSymbol",
      ethereum.Value.fromString(collectionSymbol)
    )
  )
  collectionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )
  collectionCreatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return collectionCreatedEvent
}

export function createDepositOfFundsEvent(
  userAddress: Address,
  funds: BigInt
): DepositOfFunds {
  let depositOfFundsEvent = changetype<DepositOfFunds>(newMockEvent())

  depositOfFundsEvent.parameters = new Array()

  depositOfFundsEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  depositOfFundsEvent.parameters.push(
    new ethereum.EventParam("funds", ethereum.Value.fromUnsignedBigInt(funds))
  )

  return depositOfFundsEvent
}

export function createItemCreatedEvent(
  tokenId: BigInt,
  collectionAddress: Address,
  userAddress: Address,
  uri: string
): ItemCreated {
  let itemCreatedEvent = changetype<ItemCreated>(newMockEvent())

  itemCreatedEvent.parameters = new Array()

  itemCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )
  itemCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  itemCreatedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return itemCreatedEvent
}

export function createItemListedForSaleEvent(
  tokenId: BigInt,
  colectionAddress: Address,
  price: BigInt
): ItemListedForSale {
  let itemListedForSaleEvent = changetype<ItemListedForSale>(newMockEvent())

  itemListedForSaleEvent.parameters = new Array()

  itemListedForSaleEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemListedForSaleEvent.parameters.push(
    new ethereum.EventParam(
      "colectionAddress",
      ethereum.Value.fromAddress(colectionAddress)
    )
  )
  itemListedForSaleEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return itemListedForSaleEvent
}

export function createItemWithdrawnFromSaleEvent(
  tokenId: BigInt,
  colectionAddress: Address
): ItemWithdrawnFromSale {
  let itemWithdrawnFromSaleEvent = changetype<ItemWithdrawnFromSale>(
    newMockEvent()
  )

  itemWithdrawnFromSaleEvent.parameters = new Array()

  itemWithdrawnFromSaleEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemWithdrawnFromSaleEvent.parameters.push(
    new ethereum.EventParam(
      "colectionAddress",
      ethereum.Value.fromAddress(colectionAddress)
    )
  )

  return itemWithdrawnFromSaleEvent
}

export function createMarketplaceApprovedForTokenEvent(
  tokenId: BigInt,
  collectionAddress: Address
): MarketplaceApprovedForToken {
  let marketplaceApprovedForTokenEvent = changetype<
    MarketplaceApprovedForToken
  >(newMockEvent())

  marketplaceApprovedForTokenEvent.parameters = new Array()

  marketplaceApprovedForTokenEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  marketplaceApprovedForTokenEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )

  return marketplaceApprovedForTokenEvent
}

export function createMarketplacePermissionsRevokedEvent(
  tokenId: BigInt,
  collectionAddress: Address
): MarketplacePermissionsRevoked {
  let marketplacePermissionsRevokedEvent = changetype<
    MarketplacePermissionsRevoked
  >(newMockEvent())

  marketplacePermissionsRevokedEvent.parameters = new Array()

  marketplacePermissionsRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  marketplacePermissionsRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )

  return marketplacePermissionsRevokedEvent
}

export function createOfferMadeEvent(
  tokenId: BigInt,
  collectionAddress: Address,
  offerer: Address,
  price: BigInt
): OfferMade {
  let offerMadeEvent = changetype<OfferMade>(newMockEvent())

  offerMadeEvent.parameters = new Array()

  offerMadeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  offerMadeEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )
  offerMadeEvent.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )
  offerMadeEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return offerMadeEvent
}

export function createOfferRejectedEvent(
  tokenId: BigInt,
  collectionAddress: Address,
  offerer: Address
): OfferRejected {
  let offerRejectedEvent = changetype<OfferRejected>(newMockEvent())

  offerRejectedEvent.parameters = new Array()

  offerRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  offerRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )
  offerRejectedEvent.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )

  return offerRejectedEvent
}

export function createOfferWithdrawnEvent(
  tokenId: BigInt,
  collectionAddress: Address,
  offerer: Address
): OfferWithdrawn {
  let offerWithdrawnEvent = changetype<OfferWithdrawn>(newMockEvent())

  offerWithdrawnEvent.parameters = new Array()

  offerWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  offerWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )
  offerWithdrawnEvent.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )

  return offerWithdrawnEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTradeConfirmedEvent(
  tokenId: BigInt,
  collecionAddress: Address,
  fromUser: Address,
  toUser: Address,
  price: BigInt
): TradeConfirmed {
  let tradeConfirmedEvent = changetype<TradeConfirmed>(newMockEvent())

  tradeConfirmedEvent.parameters = new Array()

  tradeConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tradeConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "collecionAddress",
      ethereum.Value.fromAddress(collecionAddress)
    )
  )
  tradeConfirmedEvent.parameters.push(
    new ethereum.EventParam("fromUser", ethereum.Value.fromAddress(fromUser))
  )
  tradeConfirmedEvent.parameters.push(
    new ethereum.EventParam("toUser", ethereum.Value.fromAddress(toUser))
  )
  tradeConfirmedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return tradeConfirmedEvent
}

export function createWithdrawalOfFundsEvent(
  userAddress: Address,
  funds: BigInt
): WithdrawalOfFunds {
  let withdrawalOfFundsEvent = changetype<WithdrawalOfFunds>(newMockEvent())

  withdrawalOfFundsEvent.parameters = new Array()

  withdrawalOfFundsEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  withdrawalOfFundsEvent.parameters.push(
    new ethereum.EventParam("funds", ethereum.Value.fromUnsignedBigInt(funds))
  )

  return withdrawalOfFundsEvent
}
