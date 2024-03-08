import { Request,Response } from "express";
import { TClientCoordinates } from "./interfaces/interfaces";
import { client } from "./dataBase";

const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
    return Math.sqrt((point2[0] - point1[0]) ** 2 + (point2[1] - point1[1]) ** 2);
}

const calculateTotalDistance = (route: number[], coordinates: [number, number][]): number => {
    let totalDistance = 0;

    if (route.length <= 1) {
        return totalDistance;
    }

    for (let i = 0; i < route.length - 1; i++) {
        const point1 = coordinates[route[i]];
        const point2 = coordinates[route[i + 1]];

        if (point1 && point2) {
            totalDistance += calculateDistance(point1, point2);
        } else {
            console.error("Error: Coordinates missing to form the route.");
            return Infinity;
        }
    }

    return totalDistance;
}



const findOptimalRoute = async (clients: TClientCoordinates[]): Promise<{ route: number[]; distance: number; clients: TClientCoordinates[] }> => {
    const coordinates: [number, number][] = clients.map(client => {
        const coordinateX = client.coordenada_x;
        const coordinateY = client.coordenada_y;

        if (typeof coordinateX === 'number' && typeof coordinateY === 'number') {
            return [coordinateX, coordinateY];
        } else {
            console.error(`Invalid coordinates for client: ${client.name}`);
            return [0, 0];
        }
    });

    const n = coordinates.length;
    const clientIndices = Array.from({ length: n - 1 }, (_, i) => i + 1);

    let shortestDistance = Infinity;
    let bestRoute: number[] | null = null;
    // let clientsOnRoute: string[] = [];
    let clientsOnRoute: { id: number; name: string; coordenada_x: number; coordenada_y: number; }[] = [];

    await heapPermutation(clientIndices, n);

    async function heapPermutation(arr: number[], size: number) {
        if (size === 1) {
            const currentRoute = [0, ...arr, 0];
            const currentDistance = calculateTotalDistance(currentRoute, coordinates);

            if (currentDistance < shortestDistance) {
                shortestDistance = currentDistance;
                bestRoute = currentRoute;
                clientsOnRoute = bestRoute.map((index) => {
                    const client = clients[index];
                    return {
                        id: client.id,
                        name: client.name,
                        coordenada_x: client.coordenada_x,
                        coordenada_y: client.coordenada_y,
                    };
                });
            }
        }

        for (let i = 0; i < size; i++) {
            await heapPermutation(arr, size - 1);

            if (size % 2 === 1) {
                [arr[0], arr[size - 1]] = [arr[size - 1], arr[0]];
            } else {
                [arr[i], arr[size - 1]] = [arr[size - 1], arr[i]];
            }
        }
    }

    return { route: bestRoute!, distance: shortestDistance, clients
    };
}

export const getCoordinates = async (request: Request, response: Response) => {
    const queryString = `
         SELECT
            id,
            coordenada_x, 
            coordenada_y,
            name
         FROM
          clients;
    `;

    try {
        const queryResult = await client.query(queryString);
  
        const clients: TClientCoordinates[] = queryResult.rows;
        const company: TClientCoordinates = {
            id:256,
            name: 'Company',
            coordenada_x: 0,
            coordenada_y: 0,
        };
        clients.unshift(company);
        const { clients: clientsOnRoute, distance, route } = await findOptimalRoute(clients);
        const coordinatesOnRoute = route.map((index) => {
            const client = clients[index];
            return {
                id: client.id,
                name: client.name,
                coordenada_x: client.coordenada_x,
                coordenada_y: client.coordenada_y,
            };
        });
        
        coordinatesOnRoute.sort((a, b) => {
            const distanceToCompanyA = calculateDistance([a.coordenada_x, a.coordenada_y], [company.coordenada_x, company.coordenada_y]);
            const distanceToCompanyB = calculateDistance([b.coordenada_x, b.coordenada_y], [company.coordenada_x, company.coordenada_y]);

            if (a.name === 'Company' && b.name === 'Company') {
                return 0;
            } else if (a.name === 'Company') {
                return 1;
            } else if (b.name === 'Company') {
                return -1;
            }

            return distanceToCompanyA - distanceToCompanyB;
        
        });
        

        return response.status(200).json({
            route,
            distance,
            calculateDistance,
            clients: clientsOnRoute,
            coordinatesOnRoute
        });
    } catch (error) {
        console.error("Error fetching clients from the database:", error);
        return response.status(500).json({ error: "Internal server error", details: (error as Error | null)?.message });
    }
};