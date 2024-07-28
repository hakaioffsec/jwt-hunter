<template>
    <div class="flex flex-col">
        <Header/>
        <div class="flex flex-col items-center min-h-screen pt-20">
            <div class="w-full max-w-7xl text-center space-y-8">
                <div class="flex justify-center mt-8">
                    <JwtAttacks/>
                </div>
                <div>
                    <JwtAttackOptions/>
                </div>
                <div>
                    <JwtPreview/>
                </div>
                <div class="pb-16">
                    <JwtPayloadPreview />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const form = useJwtForm().value;
const token = useTokenStore();

form.token = await getInitialJwt();
form.payload = await getInitialJwt();
token.value = await getInitialJwt();

</script>