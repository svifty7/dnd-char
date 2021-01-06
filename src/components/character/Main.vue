<template>
    <div class="char__stats">
        <div class="char__row char__insp">
            <div class="char__insp-name">
                Вдохновение
            </div>
            <div class="char__insp-value">
                0
            </div>
        </div>
        <div class="char__row base">
            <div class="char__hp">
                <svg-icon icon-name="heart"
                          size="14"
                />

                <div class="char__hp-now">
                    {{ character.hpNow }}
                </div>

                <div class="char__hp-initial">
                    {{ character.hp }}
                </div>
            </div>
            <div class="char__tempHp">
                <svg-icon icon-name="heart-outline"
                          size="14"
                />

                <div class="char__tempHp-value">
                    {{ character.tempHp > 0 ? character.tempHp : '0' }}
                </div>
            </div>
            <div class="char__pb">
                <div class="char__pb-value">
                    {{ setProfBonus(character.lvl) }}
                </div>

                <div class="char__pb-name">
                    БМ
                </div>
            </div>
            <div class="char__armor">
                <svg-icon icon-name="shield"
                          size="14"
                />

                <div :class="[character.armorPlus > 0 ? 'char__armor-initial' : 'char__armor-value']">
                    {{ character.armor }}
                </div>

                <div v-if="character.armorPlus > 0"
                     class="char__armor-plus"
                >
                    {{ character.armorPlus }}
                </div>
            </div>
            <div class="char__init">
                <svg-icon icon-name="sword"
                          size="14"
                />

                <div class="char__init-value">
                    {{ setBaseStats(character.stats.dex) }}
                </div>
            </div>
            <div class="char__spd">
                <svg-icon icon-name="speed"
                          size="14"
                />

                <div class="char__spd-value">
                    30
                </div>
            </div>
        </div>
        <div class="char__row char__saves">
            <div class="char__saves__title">
                Спасброски
            </div>
            <div v-for="(charSave, saveKey) in character.stats"
                 :key="saveKey"
                 class="char__saves__item"
            >
                <span class="char__saves__item-name">{{ charSave.fullName }}</span>
                <span class="char__saves__item-value">{{ setSaveStats(charSave) }}</span>
            </div>
        </div>
        <div class="char__row stats">
            <div v-for="(charStat,statKey) in character.stats"
                 :key="statKey"
                 class="char__stat"
            >
                <div class="char__stat-plus">
                    {{ setBaseStats(charStat) }}
                </div>
                <div class="char__stat-normal">
                    {{ charStat.value }}
                </div>
                <div class="char__stat-name">
                    {{ charStat.name }}
                </div>
            </div>

            <div class="char__dead-or-live">
                <div class="char__dead-or-live__row">
                    <svg-icon icon-name="angel"
                              size="32"
                              @click.left.exact.prevent="resetLive"
                    />

                    <checkbox v-for="(item, itemKey) in live"
                              :key="itemKey"
                              :value="item"
                              @on-input="live[itemKey] = $event"
                    />
                </div>
                <div class="char__dead-or-live__row">
                    <svg-icon icon-name="reaper"
                              size="32"
                              @click.left.exact.prevent="resetLive"
                    />

                    <checkbox v-for="(item, itemKey) in dead"
                              :key="itemKey"
                              :value="item"
                              @on-input="dead[itemKey] = $event"
                    />
                </div>
            </div>
        </div>
        <div class="char__row char__pasPer">
            <div class="char__pasPer-name">
                пасс. Внимательность
            </div>
            <div class="char__pasPer-value">
                {{ +setBaseStats(character.stats.wis) + 10 }}
            </div>
        </div>
        <div class="char__row char__hitDice">
            <div class="char__hitDice-name">
                Кость хитов
            </div>
            <div class="char__hitDice-value">
                1к8
            </div>
        </div>
    </div>
</template>

<script>
    import SvgIcon from '@/components/UI/SvgIcon';
    import Checkbox from '@/components/UI/Checkbox';

    export default {
        name: "MainInfo",
        components: { Checkbox, SvgIcon },
        props: {
            character: {
                type: Object,
                default: () => null
            }
        },
        data() {
            return {
                live: {
                    first: false,
                    second: false,
                    third: false,
                },
                dead: {
                    first: false,
                    second: false,
                    third: false,
                },
            }
        },
        methods: {
            setBaseStats(charStat) {
                let statPlusValue = Math.floor((charStat.value - 10) / 2);

                if (statPlusValue > 0) {
                    statPlusValue = `+${ statPlusValue}`
                }

                return statPlusValue;
            },

            setSaveStats(charSave) {
                let statPlusValue = Math.floor((charSave.value - 10) / 2);

                if (statPlusValue > 0) {
                    statPlusValue = `+${ statPlusValue}`
                }

                return statPlusValue;
            },

            setProfBonus(lvl) {
                let profBonus;

                if (lvl < 5) {
                    profBonus = 2
                } else if (lvl < 9) {
                    profBonus = 3
                } else if (lvl < 13) {
                    profBonus = 4
                } else if (lvl < 17) {
                    profBonus = 5
                } else {
                    profBonus = 6
                }

                if (profBonus > 0) {
                    profBonus = `+${ profBonus}`
                }
                return profBonus;
            },

            resetLive() {
                this.live = {
                    first: false,
                    second: false,
                    third: false,
                };

                this.dead = {
                    first: false,
                    second: false,
                    third: false,
                };
            }
        }
    }
</script>

<style lang="scss" scoped>
    .char {
        &__block {
            @include content;

            padding-top: 8px;
            padding-bottom: 8px;

            &.fixed {
                position: sticky;
                top: 40px;
                background-color: $white;
                z-index: 100;
                border-bottom: 1px solid $gray;
            }
        }

        &__row {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 8px;

            & > * {
                margin-right: 8px;

                &:last-child {
                    margin-right: 0;
                }
            }

            &.stats {
                text-align: center;
                justify-content: flex-start;
                margin: 8px auto 0;
            }

            &.base {
                justify-content: space-between;

                > * {
                    margin-right: 0;

                    &:nth-child(n + 4) {
                        margin-bottom: 0;
                    }
                }
            }
        }

        &__stats {
            @include content;

            padding-top: 12px;
            padding-bottom: 12px;
        }

        &__pb {
            border: 1px solid $gray;
            padding: 8px 12px;
            border-radius: 4px;
            margin-bottom: 8px;
            position: relative;
            width: calc(100% / 3 - (16px / 3.1));
            min-height: 86px;

            &-name {
                text-align: center;
            }

            &-value {
                text-align: center;
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 8px;
                border-bottom: 1px solid $gray;
                padding-bottom: 8px;
            }
        }

        &__spd, &__init, &__tempHp {
            border: 1px solid $gray;
            padding: 8px 12px;
            border-radius: 4px;
            margin-bottom: 8px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: calc(100% / 3 - (16px / 3));
            min-height: 86px;

            svg {
                position: absolute;
                left: 8px;
                top: 8px;
            }

            *:not(svg) {
                text-align: center;
                position: relative;
            }

            &-value {
                text-align: center;
                font-size: 32px;
                font-weight: 600;
            }
        }

        &__pasPer, &__insp, &__hitDice {
            border: 1px solid $gray;
            border-radius: 4px;
            flex-wrap: nowrap;
            width: 100%;

            &-name {
                text-align: center;
                border-right: 1px solid $gray;
                padding: 8px 12px;
                flex: 1 1 100%;
                margin: 0;
            }

            &-value {
                text-align: center;
                padding: 8px 12px;
                font-weight: 600;
            }
        }

        &__stat {
            width: calc(100% / 4 - 6px);
            margin-bottom: 8px;
            border: 1px solid $gray;
            padding: 8px 12px;
            border-radius: 4px;

            &:nth-child(4) {
                margin-right: 0;
            }

            &-plus {
                text-align: center;
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 8px;
                border-bottom: 1px solid $gray;
                padding-bottom: 8px;
            }

            &-name {
                font-size: 14px;
                margin-top: 4px;
            }
        }

        &__dead-or-live {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-bottom: 8px;

            &__row {
                display: flex;
                align-items: center;

                .svg-icon {
                    margin: 0 8px 0 16px;
                    cursor: pointer;
                }

                .checkbox {
                    margin-left: 8px;
                    width: 18px;
                    height: 18px;
                }
            }
        }

        &__hp {
            border: 1px solid $gray;
            padding: 8px 12px;
            border-radius: 4px;
            margin-bottom: 8px;
            position: relative;
            width: calc(100% / 3 - (16px / 3));
            min-height: 86px;

            svg {
                position: absolute;
                left: 8px;
                top: 8px;
            }

            *:not(svg) {
                text-align: center;
                position: relative;
            }

            &-now {
                text-align: center;
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 8px;
                border-bottom: 1px solid $gray;
                padding-bottom: 8px;
            }
        }

        &__armor {
            border: 1px solid $gray;
            padding: 8px 12px;
            border-radius: 4px;
            position: relative;
            width: calc(100% / 3 - (16px / 3));
            min-height: 86px;

            svg {
                position: absolute;
                left: 8px;
                top: 8px;
            }

            *:not(svg) {
                text-align: center;
                position: relative;
            }

            &-initial {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 8px;
                border-bottom: 1px solid $gray;
                padding-bottom: 8px;
            }

            &-value {
                font-size: 32px;
                font-weight: 600;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        &__saves {
            display: flex;
            flex-wrap: wrap;
            border: 1px solid $gray;
            border-radius: 4px;

            &__title {
                width: 100%;
                border-bottom: 1px solid $gray;
                padding: 8px 8px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                margin: 0;
            }

            &__item {
                border-bottom: 1px solid $gray;
                padding: 8px 8px;
                display: inline-flex;
                width: 50%;
                justify-content: flex-start;
                align-items: center;
                margin: 0;
                font-size: 14px;

                &:nth-child(odd) {
                    border-left: 1px solid $gray;
                }

                &:last-child, &:nth-last-child(2) {
                    margin-bottom: 0;
                    border-bottom: 0;
                }

                &-value {
                    margin-left: auto;
                    font-weight: 600;
                }
            }
        }
    }
</style>
