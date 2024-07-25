<template>
    <div class="flex flex-col w-full text-left">
        <label for="header" class="block text-white font-normal pb-4 text-2xl">Public Key</label>
        <div class="space-x-2">
            <input id="jwk-checkbox" name="jwk-checkbox" type="checkbox" v-model="attackOptions.options.useJwk" class="mb-4">
            <label for="jwk-checkbox">Use JWK to sign token</label>
        </div>
        <UTextarea autoresize v-model="publicKey" variant="none" :rows=10 id="jwt-public-key" spellcheck="false" textareaClass="text-md p-4 w-full bg-secondary border border-secondary-300 focus:border-secondary-300"/>
    </div>
</template>

<script setup lang="ts">
import jwkToPem from 'jwk-to-pem';
import { EAlgorithms } from '~/commons/enums/algorithms-enum';
import type { IAttack } from '~/commons/interfaces/attack-interface';
import { useTokenStore } from '~/stores/useTokenStore';

const form = useJwtForm().value;
const token = useTokenStore();

const attackOptions = reactive({
    algorithms: [EAlgorithms.RS256, EAlgorithms.RS384, EAlgorithms.RS512],
    options: {
        useJwk: false,
        publicKey: ''
    }
} as IAttack);

const publicKey = ref('');

watch([token, publicKey, attackOptions], () => {
    removeClasses('jwt-public-key', ['focus:border-error', 'border-error']);
    addClasses('jwt-public-key', ['focus:border-secondary-300', 'border-secondary-300']);

    if (attackOptions.options.useJwk) {
        try {
            attackOptions.options.publicKey = jwkToPem(JSON.parse(publicKey.value));
        } catch (e) {
            removeClasses('jwt-public-key', ['focus:border-secondary-300', 'border-secondary-300']);
            addClasses('jwt-public-key', ['focus:border-error', 'border-error']);
            console.error(e);
            return;
        }
    } else {
        attackOptions.options.publicKey = publicKey.value;
    }

    try {
        const payload = algorithmConfusion(token.value, attackOptions.options.publicKey, EAlgorithms.HS256);
        form.payload = payload
    } catch (e) {
        addErrors(['jwt-token']);
        console.error(e);
        return;
    }
});
</script>
