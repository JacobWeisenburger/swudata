import { z } from 'zod'

const aspectEnum = z.enum( [
    'Aggression',
    'Command',
    'Cunning',
    'Vigilance',
    'Heroism',
    'Villainy',
] )

const traitEnum = z.enum( [
    'Imperial',
    'Official',
] )

const triggerEnum = z.enum( [
    'On Attack',
    'When Defeated',
    'When Played',
] )

const arenaEnum = z.enum( [
    'Ground',
    'Space',
] )

const cardTypeEnum = z.enum( [
    'Leader',
    'Base',
    'Unit',
    'Event',
    'Upgrade',
    'Token',
] )

const rarityEnum = z.enum( [
    'Starter',
    'Common',
    'Uncommon',
    'Rare',
    'Legendary',
] )

const abilitySchemaBase = z.object( {
    side: z.string().optional(),
    text: z.string().optional(),
} )

const actionCostSchema = z.discriminatedUnion( 'type', [
    z.object( {
        type: z.literal( 'Resource' ),
        value: z.number(),
    } ),
    z.object( {
        type: z.literal( 'Exhaust' ),
    } ),
] )

const abilitySchema = z.discriminatedUnion( 'type', [
    abilitySchemaBase.extend( {
        type: z.literal( 'Action' ),
        costs: actionCostSchema.array(),
    } ),
    abilitySchemaBase.extend( {
        type: z.literal( 'Epic Action' ),
    } ),
    abilitySchemaBase.extend( {
        type: z.literal( 'Triggered' ),
        trigger: triggerEnum,
    } ),
    abilitySchemaBase.extend( {
        type: z.literal( 'Keyword' ),
        id: z.string(),
        value: z.number().optional(),
    } ),
    abilitySchemaBase.extend( {
        type: z.literal( 'Constant' ),
    } ),
    abilitySchemaBase.extend( {
        type: z.literal( 'Event' ),
    } ),
] )

export const cardSchema = z.object( {
    number: z.number(),
    name: z.string(),
    title: z.string(),
    type: cardTypeEnum,
    cost: z.number(),
    power: z.number(),
    hp: z.number(),
    arena: arenaEnum,
    aspects: aspectEnum.array(),
    traits: traitEnum.array(),
    abilities: abilitySchema.array(),
    artist: z.string(),
    spoiler: z.object( {
        date: z.string(),
        url: z.string(),
    } ),
    rarity: rarityEnum,
    unique: z.boolean(),
    imageUrls: z.string().array(),
} )
export type Card = z.infer<typeof cardSchema>