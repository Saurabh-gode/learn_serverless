
const { text, serial, pgTable, timestamp } = require("drizzle-orm/pg-core");

const LeadTable = pgTable("leads", {
    id: serial("id").primaryKey().notNull(),
    email: text("email"),
    first_name: text("first_name"),
    last_name: text("last_name"),
    created_at: timestamp("created_at").defaultNow(),
    description: text("description"),

})

module.exports = {
    LeadTable
}