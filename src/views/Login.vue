<template>
    <div class="login">
        <h1>Авторизация</h1>

        <form class="login__form">
            <label class="login__label">
                <span class="login__label-name">Имя пользователя</span>
                <input id="username"
                       class="login__input-text"
                       type="text"
                       placeholder="Имя пользователя"
                >
            </label>
            <label class="login__label">
                <span class="login__label-name">Пароль</span>
                <input id="password"
                       class="login__input-text"
                       type="password"
                       placeholder="Пароль"
                >
            </label>
            <input class="login__input-btn"
                   type="submit"
                   value="Войти"
            >
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
    };
</script>

<style lang="scss" scoped>

    .login {
        @include css_anim();

        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

    h1 {
        text-align: center;
        margin-bottom: 36px;
    }

    &__form {
         width: 100%;
         max-width: 350px;
         margin: 0 auto;
         text-align: left;
         color: #2c3e50;
         display: flex;
         flex-direction: column;
     }

    &__label {
         margin-bottom: 16px;

    &-name {
         margin-bottom: 8px;
     }
    }

    &__input {
    &-text {
         @include css_anim;

         width: 100%;
         color: #2c3e50;
         border: 1px solid #ced4da;
         padding: .55rem .85rem;
         border-radius: .25rem;
         appearance: none;

    &:focus {
         @include css_anim;

         outline: 0;
         box-shadow: 0 0 10px 0 rgba(0, 0, 0, .15);
         border-color: rgba(0, 0, 0, .15);
     }
    }

    &-btn {
         @include css_anim;

         display: inline-flex;
         justify-content: center;
         align-items: center;
         margin: 24px auto 0;
         background-color: #2c3e50;
         border: 0;
         color: #fff;
         appearance: none;
         cursor: pointer;
         font-weight: 400;
         text-align: center;
         white-space: nowrap;
         user-select: none;
         padding: .55rem .85rem;
         border-radius: .25rem;

    &:hover {
         @include css_anim;

         background-color: #4F6173;
     }
    }
    }
    }
</style>
