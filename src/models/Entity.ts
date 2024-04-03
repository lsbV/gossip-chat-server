export abstract class Entity {
    protected constructor(
        public id: string | null = null,
        public createdAt: number = Date.now(),
        public updatedAt: Date | null = null,
        public deletedAt: Date | null = null) {
    }
}