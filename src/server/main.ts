import alt from "alt-server";

import { metaKey, VehicleIndicatorLights } from "../shared/types.js";

alt.onClient("indicators:update", (player: alt.Player, vehicle: alt.Vehicle, indicatorLights: VehicleIndicatorLights) => {
	if (vehicle.driver?.id !== player.id) return;

	vehicle.setStreamSyncedMeta(metaKey, indicatorLights);
	vehicle.attached?.setStreamSyncedMeta(metaKey, indicatorLights);
});

alt.on('vehicleAttach', (attachedVehicle, vehicle) => {
	const indicatorLights = vehicle.getStreamSyncedMeta(metaKey)
	if (indicatorLights) {
		attachedVehicle.setStreamSyncedMeta(metaKey, indicatorLights);
	}
});

alt.on('vehicleDetach', (detachedVehicle) => {
	if (detachedVehicle.hasStreamSyncedMeta(metaKey)) {
		detachedVehicle.deleteStreamSyncedMeta(metaKey);
	}
});