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

<style></style>