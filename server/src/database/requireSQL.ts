import { promises as fs} from "fs";
import path from "path";

export async function requireSQL(sqlPath: string) {
    const sqlFile = await fs.readFile(path.join("src/database/sql", sqlPath));
    return sqlFile.toString();
}