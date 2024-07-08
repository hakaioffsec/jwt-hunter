<template>
    <div class="flex justify-center">
        <USelectMenu v-model="attackOptions.options.algorithm" :options="Object.values(NoneAttackEnum)" size="lg" color="gray" class="w-1/3" placeholder="Select attack"/>
    </div>
</template>


<script setup lang="ts">
import { EAlgorithms } from '~/commons/enums/algorithms-enum';
import { NoneAttackEnum } from '~/commons/enums/none-attack-enum';
import type { IAttack } from '~/commons/interfaces/attack-interface';

const form = useJwtForm().value;

const attackOptions = reactive({
    algorithms: Object.values(EAlgorithms),
    options: {
        algorithm: ''
    }
} as IAttack);

watch([form, attackOptions], () => {
    removeErrors(['jwt-token']);
    try {
        const payload = noneAttack(form.token, attackOptions.options.algorithm);
        form.payload = payload;
        form.token = payload;
    } catch (e) {
        addErrors(['jwt-token']);
    }
});
</script>
