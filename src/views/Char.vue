<template>
    <section v-if="character"
             ref="char"
             class="char"
    >
        <div class="char__block fixed">
            <div class="char__row">
                <div class="char__name">
                    {{ character.name }}
                </div>

                <div class="char__class">
                    {{ character.class }}
                </div>

                <div class="char__lvl">
                    <span class="char__lvl-value">{{ `${character.lvl} ур.` }}</span>
                </div>
            </div>
            <div class="char__row">
                <div class="char__race">
                    {{ character.race }}
                </div>

                <div class="char__background">
                    {{ character.background }}
                </div>
            </div>
            <div class="char__row align">
                <div class="char__align">
                    Хаотично-нейтральный
                </div>
            </div>
        </div>

        <keep-alive>
            <component :is="tabComponent"
                       :character="character"
            />
        </keep-alive>

        <div class="char__nav">
            <div class="char__nav-item"
                 :class="{ 'active': tab === 'main' }"
                 @click.left.exact.prevent="setTab('main')"
            >
                <svg-icon icon-name="user"
                          size="24"
                />
            </div>

            <div class="char__nav-item"
                 :class="{ 'active': tab === 'extra' }"
                 @click.left.exact.prevent="setTab('extra')"
            >
                <svg-icon icon-name="user-menu"
                          size="24"
                />
            </div>
        </div>
    </section>

    <section v-else
             class="char error"
    >
        Loading...
    </section>
</template>

<script>
    import { defineAsyncComponent } from 'vue';
    import SvgIcon from '@/components/UI/SvgIcon';

    export default {
        name: "Char",
        components: { SvgIcon },
        data() {
            return {
                tab: 'main'
            }
        },
        computed: {
            charList() {
                return this.$store.getters.getChars
            },

            character() {
                return this.$store.getters.getChar(this.$route.params.id)
            },

            tabComponent() {
                switch (this.tab) {
                    case 'extra': {
                        return defineAsyncComponent(() => import('@/components/character/Extra.vue'));
                    }

                    default: {
                        return defineAsyncComponent(() => import('@/components/character/Main.vue'));
                    }
                }
            },
        },
        mounted() {
            if (!Array.isArray(this.charList) || !this.charList.length) {
                this.$store.dispatch('setChars')
            }
        },
        methods: {
            setTab(name) {
                this.tab = name
            },

            setExp(lvl) {
                const level = parseInt(lvl, 10);

                let totalExp;

                if (level === 1) {
                    totalExp = 300
                } else if (level === 2) {
                    totalExp = 900
                } else if (level === 3) {
                    totalExp = 2700
                } else if (level === 4) {
                    totalExp = 6500
                } else if (level === 5) {
                    totalExp = 14000
                } else if (level === 6) {
                    totalExp = 23000
                } else if (level === 7) {
                    totalExp = 34000
                } else if (level === 8) {
                    totalExp = 48000
                } else if (level === 9) {
                    totalExp = 64000
                } else if (level === 10) {
                    totalExp = 85000
                } else if (level === 11) {
                    totalExp = 100000
                } else if (level === 12) {
                    totalExp = 120000
                } else if (level === 13) {
                    totalExp = 140000
                } else if (level === 14) {
                    totalExp = 165000
                } else if (level === 15) {
                    totalExp = 195000
                } else if (level === 16) {
                    totalExp = 225000
                } else if (level === 17) {
                    totalExp = 265000
                } else if (level === 18) {
                    totalExp = 305000
                } else if (level === 19) {
                    totalExp = 355000
                } else {
                    totalExp = ''
                }

                if (totalExp > 0) {
                    totalExp = totalExp.toLocaleString();
                    totalExp = ` / ${ totalExp}`
                }

                return totalExp;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .char {
        padding-top: 0;
        padding-bottom: 40px;

        &__nav {
            @include content;

            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: $white;
            z-index: 100;
            position: fixed;
            left: 0;
            bottom: 0;
            box-shadow: 0 0 12px transparentize($black, .75);

            &-item {
                @include css_anim($item: color);

                color: $black;
                text-decoration: none;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                padding: 12px 16px;
                display: inline-flex;
                border-left: 1px solid $gray;

                &:last-child {
                    border-right: 1px solid $gray;
                }

                &.active {
                    color: $green;
                    cursor: default;
                }

                &:hover {
                    &:not(.active) {
                        color: $gray;
                    }
                }
            }
        }

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
                justify-content: flex-start;
                margin: 8px auto 0;
            }

            &.align {
                margin: 0;

                & > * {
                    margin: 0 auto 0 0;
                }
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

        &__name {
            margin-right: auto;
            font-weight: 600;
        }

        &__background {
            margin-left: auto;
        }

        &__lvl {
            &-value {
                font-weight: 600;
            }
        }

        &__exp {
            &-value {
                font-weight: 600;
            }
        }
    }
</style>
