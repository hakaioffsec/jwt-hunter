<template>
	<div class="flex flex-row space-x-8 mt-14 w-full justify-center">
		<div class="col-span-1 md:col-span-1 flex flex-col">
			<label for="encoded-token" class="block text-left text-white font-normal pb-4 text-2xl">Encoded</label>
			<textarea v-model="form.token" id="jwt-token" variant="none" :cols=50 spellcheck="false" class="text-white text-md h-full p-4 border border-secondary-300 bg-secondary focus:outline-none focus:border-secondary-300 rounded-md resize-none" />
		</div>
		<div class="flex flex-col flex-1">
			<label for="header" class="block text-left text-white font-normal pb-4 text-2xl">Decoded</label>
			<div id="header"
				class="flex flex-col w-full divide-y divide-secondary-300 border border-secondary-300 bg-secondary rounded-md shadow-md text-lg flex-1"
				spellcheck="false">
				<div class="flex py-1.5 px-3">
					<span class="text-white text-sm">HEADER: <span class="text-gray-500">ALGORITHM & TOKEN TYPE</span></span>
				</div>
				<UTextarea id="jwt-token-header" autoresize v-model="jwtParts.header" variant="none" :rows=5 spellcheck="false" textareaClass="text-md text-jwt-header p-4 rounded-none border border-secondary focus:border-secondary"/>
				<div class="flex py-1.5 px-3">
					<span class="text-white text-sm">PAYLOAD: <span class="text-gray-500">DATA</span></span>
				</div>
				<UTextarea id="jwt-token-payload" autoresize v-model="jwtParts.payload" variant="none" spellcheck="false" textareaClass="text-md text-jwt-payload p-4 rounded-t-none border border-secondary focus:border-secondary"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { EAttacks } from '~/commons/enums/attacks-enum';
import { TokenException } from '~/commons/exceptions/token-exception';
import { useTokenStore } from '~/stores/useTokenStore';

const form = useJwtForm().value;
const token = useTokenStore();

const jwtParts = reactive({
	header: '',
	payload: ''
})

let tokenParts = getJwtParts(form.token);
jwtParts.header = JSON.stringify(tokenParts[0], null, 2);
jwtParts.payload = JSON.stringify(tokenParts[1], null, 2);

watch(() => form.token, () => {
	removeClasses('jwt-token', ['outline', 'outline-1', 'outline-error']);
	addClasses('jwt-token', ['focus:outline-none']);

	try {
		const parts = getJwtParts(form.token);

		jwtParts.header = JSON.stringify(parts[0], null, 2)
		jwtParts.payload = JSON.stringify(parts[1], null, 2);
	} catch (error) {
		if(error instanceof TokenException) {
			removeClasses('jwt-token', ['focus:outline-none']);
			addClasses('jwt-token', ['outline', 'outline-1', 'outline-error'])
		} else {
			console.error(error);
		}
	}
});

watch(jwtParts, () => {
	const parts	= form.token.split('.');

	removeClasses('jwt-token-header', ['border-error', 'focus:border-error']);
	addClasses('jwt-token-header', ['border-secondary', 'focus:border-secondary']);

	removeClasses('jwt-token-payload', ['border-error', 'focus:border-error']);
	addClasses('jwt-token-payload', ['border-secondary', 'focus:border-secondary']);

	if(parts) {
		try {
			parts[0] = encodeJwtPart(JSON.parse(jwtParts.header));
		} catch (e) {
			removeClasses('jwt-token-header', ['border-secondary', 'focus:border-secondary']);
			addClasses('jwt-token-header', ['border-error', 'focus:border-error']);
		}

		try {
			parts[1] = encodeJwtPart(JSON.parse(jwtParts.payload));
		} catch (e) {
			removeClasses('jwt-token-payload', ['border-secondary', 'focus:border-secondary']);
			addClasses('jwt-token-payload', ['border-error', 'focus:border-error']);
		}

		token.value = parts.join('.');
		
		if(form.attack == EAttacks.CUSTOM) {
			form.payload = token.value
		}
	}
});
</script>
