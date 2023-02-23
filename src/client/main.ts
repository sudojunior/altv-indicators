import alt from "alt-client";

import { KeyCode, metaKey, VehicleIndicatorLights } from '../shared/types';

alt.on("keydown", (key: alt.KeyCode) => {
	const player = alt.Player.local;
	const vehicle = player.vehicle;

	if (vehicle === null || vehicle.netOwner.id !== player.id)
		return;

	// @ts-ignore
	let indicatorLights = vehicle.indicatorLights as VehicleIndicatorLights;
	let indicatorTarget = VehicleIndicatorLights.Off;

	// @ts-ignore
	if (indicatorLights === VehicleIndicatorLights.BlinkPermBoth && (key === KeyCode["["] || key === KeyCode["]"]))
		return;

	switch (key) {
		// @ts-ignore
		case KeyCode["["]: // Left
			indicatorTarget = VehicleIndicatorLights.BlinkLeft;
			break;
		// @ts-ignore
		case KeyCode["]"]: // Right
			indicatorTarget = VehicleIndicatorLights.BlinkRight;
			break;
		// @ts-ignore
		case KeyCode["#"]: // Hazards
			indicatorTarget = VehicleIndicatorLights.BlinkPermBoth;
			break;
	}

	if (indicatorTarget !== VehicleIndicatorLights.Off) {
		indicatorLights = (indicatorLights & indicatorTarget) ? VehicleIndicatorLights.Off : indicatorTarget;
		alt.emitServer("indicators:update", vehicle, indicatorLights);
	}
});

alt.on("streamSyncedMetaChange", (entity: alt.Entity) => {
	if (!(entity instanceof alt.Vehicle))
		return;

	// @ts-ignore
	entity.indicatorLights = entity.getStreamSyncedMeta(metaKey) ?? 0;
});
