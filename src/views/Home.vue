<template>
    <div class="chars">
        <div v-if="charList"
             class="chars__list"
        >
            <router-link v-for="char in charList"
                         :key="char.id"
                         :to="{ name: 'char', params: { id: char.id } }"
                         class="chars__item"
            >
                <div v-if="'img' in char && !!char.img"
                     class="chars__item-img"
                     :style="{backgroundImage: 'url('+ char.img +')'}"
                />

                <svg-icon v-else
                          icon-name="anon"
                          :size="48"
                />

                <div class="chars__item-cont">
                    <div class="chars__item-name">
                        {{ char.name }}
                    </div>

                    <div class="chars__item-info">
                        <div class="chars__item-lvl">
                            {{ `${char.lvl} ур.` }}
                        </div>

                        <div class="chars__item-class">
                            {{ char.class }}
                        </div>
                    </div>
                </div>
            </router-link>
        </div>

        <div v-else
             class="chars__list"
        >
            Loading...
        </div>
    </div>
</template>

<script>
    import SvgIcon from '@/components/UI/SvgIcon';

    export default {
        name: 'Home',
        components: { SvgIcon },
        data() {
            return {};
        },
        computed: {
            charList() {
                return this.$store.getters.getChars;
            },
        },
        mounted() {
            this.$store.dispatch('setChars');
        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
    .chars {
        @include content;

        &__list {
            padding-top: 12px;
        }

        &__item {
            @include css_anim;

            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            color: $black;
            padding: 8px 12px;
            border-radius: 4px;
            text-decoration: none;
            text-align: left;
            cursor: pointer;
            box-shadow: 0 0 10px 0 transparentize($black, .85);

            &:nth-child(n+2) {
                margin-top: 8px;
            }

            &:hover {
                @include css_anim;

                background-color: lighten($gray, 14%);
            }

            &-img {
                content: '';
                display: block;
                width: 48px;
                height: 48px;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                flex-shrink: 0;
            }

            &-cont {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding-left: 12px;
            }

            &-name {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
                font-weight: 600;
            }

            &-info {
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                margin-top: 4px;
            }

            &-lvl, &-class {
                max-width: 100%;
            }

            &-class {
                margin-left: 8px;
            }

            &-lvl {
                font-weight: 600;
            }
        }
    }
</style>
