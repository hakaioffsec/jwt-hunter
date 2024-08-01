<template>
    <div class="flex justify-center">
        <USelectMenu v-slot="{ open }" v-model="algorithm":options="Object.keys(EAlgorithms)" size="lg" color="gray" class="w-1/3" placeholder="Select algorithm">
            <UButton color="gray" class="flex-1 justify-between py-2.5">
                {{ algorithm }}
                <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500" :class="[open && 'transform rotate-90']" />
            </UButton>
        </USelectMenu>
    </div>
</template>

<script setup lang="ts">
import { EAlgorithms } from '~/commons/enums/algorithms-enum';
const jwtParts = useJwtParts().value;

const algorithm = ref(EAlgorithms.HS256);

watch(algorithm, async () => {
    try {
        const header = JSON.parse(jwtParts.header);
        header['alg'] = algorithm.value;
        // jwtParts.header = JSON.stringify(header, null, 2);
    } catch(e) {
        console.error(e);
    }
})

</script>