export abstract class Entity {
    protected constructor(
        public id: string | undefined = undefined,
        public createdAt: number = Date.now(),
        public updatedAt: number | null = null,
        public deletedAt: number | null = null) {
    }
}