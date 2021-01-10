<template>
    <div class="bag">
        {{ character.bag }}
    </div>
</template>

<script>
    export default {
        name: 'Bag',
        props: {
            character: {
                type: Object,
                default: () => null
            }
        },
    };
</script>

<style lang="scss" scoped>
    .bag {
        @include content;

        padding-top: 12px;
        padding-bottom: 12px;
    }
</style>
