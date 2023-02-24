export const metaKey = "indicatorLights";

// Borrowing from 'altv-shared' which isn't updated for some reason.
// - While IntelliSense may register them as entries, none of them are there when the server attempts to use them.

/**
 * A partial filler for what isn't provided in the alt-client import.
 * If you wish to modify this enum, please check https://keycode.info (press each key you want to use and copy it into the key map) or use https://keycode.info/table - based on the US layout.
 * *While AltV's documentation may be a source of truth, it is not 100% accurate or accommodating to different keyboard layouts (https://docs.altv.mp/js/api/alt-client.KeyCode.html).*.
 * 
 * @partial
 * @member {alt-shared}
 */
export enum KeyCode {
  "[" = 219,
  "]" = 221,
  "#" = 222,
  "`" = 223 // Filler for ./src/client/main.ts#L36 preventing ts(2367) from occurring
}

/**
 * @member {alt-shared}
 */
export enum VehicleIndicatorLights {
  Off = 0, // Implicit as initial
  BlinkLeft = 1,
  BlinkRight = 2,
  BlinkPermBoth = 4,
  StaticBoth = 8,
  Interior = 64
}

declare module "alt-shared" {
  export interface ICustomVehicleStreamSyncedMeta {
    [metaKey]: VehicleIndicatorLights;
  }
}