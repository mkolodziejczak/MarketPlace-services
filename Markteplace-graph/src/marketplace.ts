import { BigInt, store } from "@graphprotocol/graph-ts";
import {
  CollectionCreated as CollectionCreatedEvent,
  DepositOfFunds as DepositOfFundsEvent,
  ItemCreated as ItemCreatedEvent,
  ItemListedForSale as ItemListedForSaleEvent,
  ItemWithdrawnFromSale as ItemWithdrawnFromSaleEvent,
  MarketplaceApprovedForToken as MarketplaceApprovedForTokenEvent,
  MarketplacePermissionsRevoked as MarketplacePermissionsRevokedEvent,
  OfferMade as OfferMadeEvent,
  OfferRejected as OfferRejectedEvent,
  OfferWithdrawn as OfferWithdrawnEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TradeConfirmed as TradeConfirmedEvent,
  WithdrawalOfFunds as WithdrawalOfFundsEvent
} from "../generated/Marketplace/Marketplace"
import {
  Token,
  User,
  Collection,
  Offer,
  Listing
} from "../generated/schema"

export function handleCollectionCreated(event: CollectionCreatedEvent): void {

  let collection = new Collection( event.params.collectionAddress.toHexString() );
  collection.collectionName = event.params.collectionName
  collection.collectionSymbol = event.params.collectionSymbol
  collection.collectionAddress = event.params.collectionAddress
  collection.creator = event.params.user.toHexString();
  collection.save()

  let user = User.load( event.params.user.toHexString() );
  if (!user) {
    user = new User( event.params.user.toHexString() );
    user.userAddress = event.params.user;
    user.funds = new BigInt(0);
    user.save();
  }
}

export function handleDepositOfFunds(event: DepositOfFundsEvent): void {

  let user = User.load( event.params.userAddress.toHexString() );
  if (!user) {
    user = new User( event.params.userAddress.toHexString() );
    user.userAddress = event.params.userAddress;
    user.funds = new BigInt( 0 );
  }
  user.funds = user.funds.plus( event.params.funds );
  user.save();
}

export function handleItemCreated(event: ItemCreatedEvent): void {
  let item = new Token(event.params.tokenId.toString() + "#" + event.params.collectionAddress.toHexString());
  item.tokenId = event.params.tokenId;
  item.collection = event.params.collectionAddress.toHexString();
  item.owner = event.params.userAddress.toHexString();
  item.uri = event.params.uri;
  item.approved = false;
  item.save()

  let user = User.load(event.params.userAddress.toHexString());
  if (!user) {
    user = new User(event.params.userAddress.toHexString());
    user.userAddress = event.params.userAddress;
    user.funds = new BigInt(0);
    user.save();
  }
}

export function handleItemListedForSale(event: ItemListedForSaleEvent): void {
  let item = Token.load(event.params.tokenId.toString() + "#" + event.params.colectionAddress.toHexString());
  
  let listing = new Listing("sale#" + event.params.tokenId.toString() + "#" + event.params.colectionAddress.toHexString());
  listing.collection = event.params.colectionAddress.toHexString();
  listing.token = item!.id;
  listing.price = event.params.price;
  listing.save()
}

export function handleItemWithdrawnFromSale(
  event: ItemWithdrawnFromSaleEvent
): void {
  let item = new Token(event.params.tokenId.toString() + "#" + event.params.colectionAddress.toHexString());
  item.listing = null;
  item.save();
  let listing = Listing.load("sale#" + event.params.tokenId.toString() + "#" + event.params.colectionAddress.toHexString());
  store.remove('Listing', listing!.id);
}

export function handleMarketplaceApprovedForToken(
  event: MarketplaceApprovedForTokenEvent
): void {
  let item = Token.load(event.params.tokenId.toString() + "#" + event.params.collectionAddress.toHexString());
  item!.approved = true;
  item!.save();
}

export function handleMarketplacePermissionsRevoked(
  event: MarketplacePermissionsRevokedEvent
): void {
  let item = Token.load(event.params.tokenId.toString() + "#" + event.params.collectionAddress.toHexString());
  item!.approved = false;
  item!.save();
}

export function handleOfferMade(event: OfferMadeEvent): void {
  let item = Token.load(event.params.tokenId.toString() + "#" + event.params.collectionAddress.toHexString());
  let offer = new Offer(event.params.tokenId.toString() + "#" + event.params.collectionAddress.toHexString() + "#" + event.params.offerer.toHexString());
  offer.active = true;
  offer.token = item!.id;
  offer.offerer = event.params.offerer.toHexString();
  offer.price = event.params.price;
  offer.collection = event.params.collectionAddress.toHexString();
  offer.save()

  let user = User.load(event.params.offerer.toHexString());
  if (!user) {
    user = new User(event.params.offerer.toHexString());
    user.userAddress = event.params.offerer;
    user.funds = new BigInt(0);
    user.save();
  }
}

export function handleOfferRejected(event: OfferRejectedEvent): void {
  let offer = Offer.load(event.params.tokenId.toString() + "#" + event.params.collectionAddress.toHexString() + "#" + event.params.offerer.toHexString());
  offer!.active = false;

  offer!.save()
}

export function handleOfferWithdrawn(event: OfferWithdrawnEvent): void {
  let item = Token.load(event.params.tokenId.toString() + "#" + event.params.collectionAddress.toHexString());
  let offer = Offer.load(event.params.tokenId.toString() + "#" + event.params.collectionAddress.toHexString() + "#" + event.params.offerer.toHexString());


  store.remove('Offer', offer!.id);
}

export function handleTradeConfirmed(event: TradeConfirmedEvent): void {

  let item = Token.load(event.params.tokenId.toString() + "#" + event.params.collecionAddress.toHexString());
  
  let fromUser = User.load(event.params.fromUser.toHexString());
  fromUser!.funds = fromUser!.funds.plus(event.params.price);
  fromUser!.save();

  let toUser = User.load(event.params.toUser.toHexString());
  if (!toUser) {
    toUser = new User(event.params.toUser.toHexString());
    toUser.userAddress = event.params.toUser;
    toUser.funds = new BigInt(0);
    toUser.save();
  }

  item!.approved = false;
  item!.owner = toUser.id;

  let listing = Listing.load("sale#" + event.params.tokenId.toString() + "#" + event.params.collecionAddress.toHexString());
  
  if (listing) {
    store.remove('Listing', listing!.id);
  }

  let offer = Offer.load(event.params.tokenId.toString() + "#" + event.params.collecionAddress.toHexString() + "#" + event.params.toUser.toHexString());
  
  if (offer) {
    store.remove('Offer', offer!.id);
  }
}

export function handleWithdrawalOfFunds(event: WithdrawalOfFundsEvent): void {
  let user = User.load(event.params.userAddress.toHexString());
  if (!user) {
    user = new User(event.params.userAddress.toHexString());
    user.userAddress = event.params.userAddress;
    user.funds = new BigInt(0);
  }
  user.funds = user.funds.minus(event.params.funds);
  user.save();
}
