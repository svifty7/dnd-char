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
                    {{ character.align }}
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

            <div class="char__nav-item"
                 :class="{ 'active': tab === 'bag' }"
                 @click.left.exact.prevent="setTab('bag')"
            >
                <svg-icon icon-name="bag"
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
    import { mapGetters } from 'vuex';
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
            ...mapGetters({
                charList: 'getChars',
                character: 'getChar',
            }),

            tabComponent() {
                switch (this.tab) {
                    case 'extra': {
                        return defineAsyncComponent(() => import('@/components/character/Extra.vue'));
                    }

                    case 'bag': {
                        return defineAsyncComponent(() => import('@/components/character/Bag.vue'));
                    }

                    default: {
                        return defineAsyncComponent(() => import('@/components/character/Main.vue'));
                    }
                }
            },
        },
        mounted() {
            this.setCharacter();
        },
        methods: {
            setTab(name) {
                this.tab = name
            },

            setCharacter() {
                if (Array.isArray(this.charList) && this.charList.length) {
                    this.$store.dispatch('setChar', this.$route.params.id);
                } else {
                    this.$store.dispatch('getChars')
                        .then(() => {
                            this.$store.dispatch('setChar', this.$route.params.id);
                        })
                }
            },
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

                color: $gray;
                text-decoration: none;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                padding: 12px 16px;
                display: inline-flex;

                &:nth-child(n+2) {
                    border-left: 1px solid $gray;
                }

                &.active {
                    color: $black;
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
