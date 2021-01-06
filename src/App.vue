<template>
    <div class="dnd-app">
        <header class="header">
            <div class="nav__btn"
                 :class="{ 'is-opened': menu }"
                 @click.left.exact.prevent="menu = !menu"
            />

            <div v-if="$route.meta.title"
                 class="header__title"
                 @click.left.exact.self.prevent="scrollTop"
            >
                {{ $route.meta.title }}
            </div>
        </header>

        <div class="nav"
             :class="{ 'is-opened': menu }"
             @click.left.exact.self.prevent="menu = false"
        >
            <div class="nav__body"
                 :class="{ 'is-opened': menu }"
            >
                <router-link to="/"
                             class="nav__item"
                             @click.left.exact="menu = false"
                >
                    Список персонажей
                </router-link>

                <router-link to="/about"
                             class="nav__item"
                             @click.left.exact="menu = false"
                >
                    О приложении
                </router-link>
            </div>
        </div>

        <main class="main">
            <router-view v-slot="{ Component }">
                <transition name="fade"
                            mode="out-in"
                >
                    <component :is="Component"/>
                </transition>
            </router-view>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                menu: false,
            };
        },
        methods: {
            scrollTop() {
                window.scroll({
                    top: 0,
                    behavior: 'smooth'
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .dnd-app {
        width: 100%;
        padding: 40px 0 0;
    }

    .header {
        @include content;

        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        z-index: 100;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding-top: 8px;
        padding-bottom: 8px;

        &__title {
            width: 100%;
            padding: 0 40px;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 600;
            font-size: 18px;
            text-align: center;
        }
    }

    .nav {
        @include css_anim();

        position: fixed;
        top: 40px;
        left: 0;
        width: 100%;
        height: calc(100% - 40px);
        background-color: transparentize(#2c3e50, .7);
        pointer-events: none;
        opacity: 0;
        z-index: 110;
        display: flex;
        justify-content: flex-start;

        &.is-opened {
            opacity: 1;
            pointer-events: auto;
            cursor: pointer;
        }

        &__body {
            @include css_anim();

            width: 228px;
            height: 100%;
            background-color: #fff;
            transform: translateX(-100%);
            display: flex;
            flex-direction: column;
            padding-top: 16px;
            box-shadow: inset 1px 4px 9px -6px transparentize(#2c3e50, .7);
            cursor: default;

            &.is-opened {
                transform: translateX(0);
            }
        }

        &__btn {
            display: flex;
            position: fixed;
            top: 8px;
            left: 16px;
            color: #2c3e50;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 2px;
            z-index: 130;
            cursor: pointer;

            &:before, &:after {
                @include css_anim();

                content: '';
                display: block;
                position: absolute;
                width: 16px;
                height: 2px;
                border-radius: 2px;
                background-color: currentColor;
            }

            &:before {
                transform: translateY(-3px);
            }

            &:after {
                transform: translateY(3px);
            }

            &:hover {
                &:before {
                    transform: translateY(-3px) translateX(3px);
                }

                &:after {
                    transform: translateY(3px) translateX(-3px);
                }
            }

            &.is-opened {
                &:before {
                    transform: rotate(45deg);
                }

                &:after {
                    transform: rotate(-45deg);
                }
            }
        }

        &__item {
            padding: 8px 16px;
            display: flex;
            width: 100%;
            cursor: pointer;
        }
    }
</style>
