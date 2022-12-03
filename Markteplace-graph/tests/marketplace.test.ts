import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CollectionCreated } from "../generated/schema"
import { CollectionCreated as CollectionCreatedEvent } from "../generated/Marketplace/Marketplace"
import { handleCollectionCreated } from "../src/marketplace"
import { createCollectionCreatedEvent } from "./marketplace-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let collectionName = "Example string value"
    let collectionSymbol = "Example string value"
    let collectionAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let newCollectionCreatedEvent = createCollectionCreatedEvent(
      collectionName,
      collectionSymbol,
      collectionAddress,
      user
    )
    handleCollectionCreated(newCollectionCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CollectionCreated created and stored", () => {
    assert.entityCount("CollectionCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CollectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "collectionName",
      "Example string value"
    )
    assert.fieldEquals(
      "CollectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "collectionSymbol",
      "Example string value"
    )
    assert.fieldEquals(
      "CollectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "collectionAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CollectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
