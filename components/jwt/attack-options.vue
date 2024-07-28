<template>
	<div>
		<div v-if="form.attack == EAttacks.CUSTOM">
			<AttackOptionsCustom />
		</div>
		<div v-if="form.attack == EAttacks.NONE_ATTACK">
			<AttackOptionsNoneAttack />
		</div>
		<div v-if="form.attack == EAttacks.ALGORITHM_CONFUSION">
			<AttackOptionsAlgorithmConfusion />
		</div>
		<div v-if="form.attack == EAttacks.KID_PATH_TRAVERSAL">
			<AttackOptionsKidPathTraversal />
		</div>
	</div>
</template>

<script setup lang="ts">
import { EAttacks } from '~/commons/enums/attacks-enum';
const form = useJwtForm().value;
</script>
