import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";
import * as CANNON from "cannon-es";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 10;
  state = new MyRoomState();
  physicsWorld: CANNON.World | null = null;
  platformData: { x: number, y: number, z: number, size: number }[] = [];

  players: { [sessionId: string]: any } = {};

  onCreate (options: any) {

    //#region Create Physics World
    //we have to create the platform here
    // Create a simple CANNON physics world
    this.physicsWorld = new CANNON.World();
    this.physicsWorld.gravity.set(0, -9.82, 0); // earth gravity

    // Create a 12x12 grid of static ground cubes to form a large platform
    const gridSize = 13;
    const cubeSize = 1;
    const halfCube = cubeSize / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
      const groundBody = new CANNON.Body({
        mass: 0, // static body
        shape: new CANNON.Box(new CANNON.Vec3(halfCube, halfCube, halfCube)), // 1x1x1m cube
        position: new CANNON.Vec3(
        x * cubeSize,
        halfCube,
        z * cubeSize
        ),
      });
      this.physicsWorld.addBody(groundBody);

      // Save position for client sync
      this.platformData.push({
        x: x * cubeSize,
        y: halfCube,
        z: z * cubeSize,
        size: cubeSize
      });
      }
    }
    //#endregion

    this.onMessage("get_platform", (client, message) => {
      // Send platform data to the client
      client.send("platform_data", this.platformData);
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");



  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
