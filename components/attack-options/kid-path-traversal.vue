<template>
    <div class="flex justify-center">
        <USelectMenu v-model="attackOptions.options.payload" :options="Object.values(EKidPayload)" size="lg" color="gray" class="w-1/3" placeholder="Select file path"/>
    </div>
</template>

<script setup lang="ts">

import { EAlgorithms } from '~/commons/enums/algorithms-enum';
import { EKidPayload } from '~/commons/enums/kid-payloads-enum';
import type { IAttack } from '~/commons/interfaces/attack-interface';
import { useTokenStore } from '~/stores/useTokenStore';

const attackOptions = reactive({
    options: {},
    algorithms: Object.values(EAlgorithms),
} as IAttack);

const token = useTokenStore();
const jwtParts = useJwtParts().value;
const form = useJwtForm().value;

watch(attackOptions, async () => {
    try {
        const payload = await kidPathTraversal(token.value, attackOptions.options.payload);
        token.value = payload;

        jwtParts.header = JSON.stringify(getJwtParts(token.value)[0], null, 2);

    } catch (e) {
        console.error(e)
    }
})

watch(token, async() => {
    try {
        const payload = await kidPathTraversal(token.value, attackOptions.options.payload);
        token.value = payload;

        form.payload = token.value;
    } catch (e) {
        console.error(e)
    }
})

</script>