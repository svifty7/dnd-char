<template>
    <div class="char__extraStats">
        <div v-for="(charStat, statKey) in character.stats"
             :key="statKey"
             class="char__extraStats__stat"
        >
            <div class="char__extraStats__stat-initial">
                <div class="char__extraStats__stat-title">
                    {{ charStat.fullName }}
                </div>

                <div class="char__extraStats__stat-value">
                    {{ getStat(charStat) }}
                </div>
            </div>

            <div v-for="(extraSave, extraSaveKey) in charStat.extra"
                 :key="extraSaveKey"
                 class="char__extraStats__item"
            >
                <div class="char__extraStats__item-name">
                    {{ extraSave.name }}
                </div>

                <div class="char__extraStats__item-value">
                    {{ getStat(charStat, extraSave) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExtraStats",
        props: {
            character: {
                type: Object,
                default: () => null
            }
        },
        methods: {
            getBaseStat(charStat) {
                return Math.floor((charStat.value - 10) / 2);
            },

            getStat(charStat, extraSave = null) {
                let statPlusValue = Math.floor((charStat.value - 10) / 2);

                if (charStat.known || (extraSave && extraSave.known)) {
                    statPlusValue += this.getProfBonus(this.character.lvl);
                }

                return statPlusValue;
            },

            getProfBonus(lvl) {
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

                return profBonus;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .char {
        &__extraStats {
            @include content;

            padding-top: 12px;
            padding-bottom: 12px;

            &__stat {
                border-radius: 4px;
                margin-bottom: 8px;
                border: 1px solid $gray;

                &-initial{
                    padding: 8px 12px;
                    display: flex;
                    justify-content: space-between;
                    background-color: transparentize($gray, .75);
                }

                &-title {
                    font-weight: 600;
                }
            }

            &__item {
                border-top: 1px solid $gray;
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 8px 12px;

                &:last-child {
                    border-bottom: 0;
                }

                &-value {
                    font-weight: 600;
                }
            }
        }
    }
</style>
