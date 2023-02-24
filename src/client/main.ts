import { Entity, Player, Vehicle, on as onEvent, emitServer } from "alt-client";

import { KeyCode, metaKey, VehicleIndicatorLights } from '../shared/types';

// @ts-ignore
onEvent("keydown", (key: KeyCode) => {
	const player = Player.local;
	const vehicle = player.vehicle;

	if (vehicle === null || vehicle.netOwner?.id !== player.id)
		return;

	// @ts-ignore
	let indicatorLights = vehicle.indicatorLights as VehicleIndicatorLights;
	let indicatorTarget = VehicleIndicatorLights.Off;

	if (indicatorLights === VehicleIndicatorLights.BlinkPermBoth && (key === KeyCode["["] || key === KeyCode["]"]))
		return;

	switch (key) {
		case KeyCode["["]: // Left
			indicatorTarget = VehicleIndicatorLights.BlinkLeft;
			break;
		case KeyCode["]"]: // Right
			indicatorTarget = VehicleIndicatorLights.BlinkRight;
			break;
		case KeyCode["#"]: // Hazards
			indicatorTarget = VehicleIndicatorLights.BlinkPermBoth;
			break;
	}

	if (indicatorTarget !== VehicleIndicatorLights.Off) {
		indicatorLights = (indicatorLights & indicatorTarget) ? VehicleIndicatorLights.Off : indicatorTarget;
		emitServer("indicators:update", vehicle, indicatorLights);
	}
});

onEvent("streamSyncedMetaChange", (entity: Entity) => {
	if (!(entity instanceof Vehicle))
		return;

	// @ts-ignore
	entity.indicatorLights = entity.getStreamSyncedMeta(metaKey) ?? 0;
});
