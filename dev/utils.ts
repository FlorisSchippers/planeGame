class Utils {
    public static collision(instance1: GameObject, instance2: GameObject): boolean {
        if (instance1.x < instance2.x + instance2.width &&
            instance1.x + instance1.width > instance2.x &&
            instance1.y < instance2.y + instance2.height &&
            instance1.height + instance1.y > instance2.y) {
            return true;
        } else {
            return false;
        }
    }
}