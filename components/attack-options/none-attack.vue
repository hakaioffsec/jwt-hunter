<template>
    <div class="flex justify-center">
        <USelectMenu v-model="attackOptions.options.algorithm" :options="Object.values(NoneAttackEnum)" size="lg" color="gray" class="w-1/3" placeholder="Select algorithm payload"/>
    </div>
</template>


<script setup lang="ts">
import { EAlgorithms } from '~/commons/enums/algorithms-enum';
import { NoneAttackEnum } from '~/commons/enums/none-attack-enum';
import type { IAttack } from '~/commons/interfaces/attack-interface';
import { useTokenStore } from '~/stores/useTokenStore';

const token = useTokenStore();
const jwtParts = useJwtParts().value;

const attackOptions = reactive({
    algorithms: Object.values(EAlgorithms),
    options: {
        algorithm: ''
    }
} as IAttack);

watch(attackOptions, async () => {
    removeErrors(['jwt-token']);
    try {
        const payload = noneAttack(token.value, attackOptions.options.algorithm);
        token.value = payload;

        jwtParts.header = JSON.stringify(getJwtParts(token.value)[0], null, 2);

    } catch (e) {
        addErrors(['jwt-token']);
    }
});
</script>
