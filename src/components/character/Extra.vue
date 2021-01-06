<template>
    <div class="char__extraStats">
        <div v-for="(charStat, statKey) in character.stats"
             v-show="charStat.extra"
             :key="statKey"
             class="char__extraStats__stat"
        >
            <div class="char__extraStats__stat-initial">
                <div class="char__extraStats__stat-title">
                    {{ charStat.fullName }}
                </div>
                <div class="char__extraStats__stat-value">
                    {{ setSaveStats(charStat) }}
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
                    {{ setExtraSave(charStat, extraSave, setProfBonus(character.lvl)) }}
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
            setSaveStats(charStat) {
                let statPlusValue = Math.floor((charStat.value - 10) / 2);

                if (statPlusValue > 0) {
                    statPlusValue = `+${ statPlusValue}`
                }

                return statPlusValue;
            },

            setExtraSave(charStat, extraSave, profBonus) {
                let statPlusValue = Math.floor((charStat.value - 10) / 2);

                if (extraSave.known) {
                    statPlusValue += parseInt(profBonus, 10);
                }

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
            }
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
                border-radius: .25rem;
                margin-bottom: 8px;
                border: 1px solid #ced4da;

                &-initial{
                    border-bottom: 1px solid #ced4da;
                    padding: .55rem .85rem;
                    display: flex;
                    justify-content: space-between;
                }

                &-title {
                    font-weight: 600;
                }
            }

            &__item {
                border-bottom: 1px solid #ced4da;
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: .55rem .85rem;

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
