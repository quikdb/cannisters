import { Command } from "commander";
import { createProject, listProjects, updateProject, createDatabase, listDatabases, updateDatabase, createDataGroup, listDataGroups, updateDataGroup, createItem, listItems, updateItem, batchWriteItems, batchGetItems } from "./client/icp.ts";
import dotenv from 'dotenv';
dotenv.config();


const program = new Command();

program
    .name("icp-cli")
    .description("CLI tool for managing ICP projects, databases, data groups, and items")
    .version("1.0.0");

// Project commands
program
  .command('create-project')
  .description('Create a new project')
  .option('-n, --name <name>', 'Project name')
  .option('-d, --description <description>', 'Project description')
  .action(async (options) => {
    await createProject(options.name, options.description, options.createdBy);
  });

program
    .command("list-projects")
    .description("List all projects")
    .action(async () => {
        await listProjects();
    });

program
    .command("update-project")
    .description("Update a project")
    .option("-i, --id <id>", "Project ID")
    .option("-n, --name <name>", "New project name")
    .option("-d, --description <description>", "New project description")
    .action(async (options) => {
        await updateProject(options.id, options.name, options.description);
    });

// Database commands
program
    .command("create-database")
    .description("Create a new database")
    .option("-n, --name <name>", "Database name")
    .option("-p, --project-id <projectId>", "Project ID")
    .action(async (options) => {
        await createDatabase(options.projectId, options.name);
    });

program
    .command("list-databases")
    .description("List all databases")
    .action(async () => {
        await listDatabases();
    });

program
    .command("update-database")
    .description("Update a database")
    .option("-i, --id <id>", "Database ID")
    .option("-n, --name <name>", "New database name")
    .action(async (options) => {
        await updateDatabase(options.id, options.name);
    });

// Data Group commands
program
    .command("create-data-group")
    .description("Create a new data group")
    .option("-n, --name <name>", "Data group name")
    .option("-d, --database-id <databaseId>", "Database ID")
    .option("-p, --project-id <projectId>", "Project ID")
    .action(async (options) => {
        await createDataGroup(options.databaseId, options.projectId, options.name);
    });

program
    .command("list-data-groups")
    .description("List all data groups")
    .action(async () => {
        await listDataGroups();
    });

program
    .command("update-data-group")
    .description("Update a data group")
    .option("-i, --id <id>", "Data group ID")
    .option("-n, --name <name>", "New data group name")
    .action(async (options) => {
        await updateDataGroup(options.id, options.name);
    });

// Item commands
program
    .command("create-item")
    .description("Create a new item")
    .option("-k, --key <key>", "Item key")
    .option("-v, --value <value>", "Item value")
    .action(async (options) => {
        await createItem(options.key, options.value);
    });

program
    .command("list-items")
    .description("List all items")
    .action(async () => {
        await listItems();
    });

program
    .command("update-item")
    .description("Update an item")
    .option("-k, --key <key>", "Item key")
    .option("-v, --value <value>", "New item value")
    .action(async (options) => {
        await updateItem(options.key, options.value);
    });

program
    .command("batch-write-items")
    .description("Batch write items")
    .option("-i, --items <items...>", "Items in key=value format")
    .action(async (options) => {
        const items = options.items.map((item: string) => {
            const [key, value] = item.split("=");
            return { key, value };
        });
        await batchWriteItems(items);
    });

program
    .command("batch-get-items")
    .description("Batch get items")
    .option("-k, --keys <keys...>", "List of item keys")
    .action(async (options) => {
        await batchGetItems(options.keys);
    });

program.parse(process.argv);
