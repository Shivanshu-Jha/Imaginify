import { verifyWebhook, WebhookEvent } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: NextRequest) {
    try {
        const evt = (await verifyWebhook(req)) as WebhookEvent;

        const { id } = evt.data;
        const eventType = evt.type;

        if (eventType === "user.created") {
            const { email_addresses, image_url, first_name, last_name, username } = evt.data;

            // Safely fallback to the email prefix if username is null/undefined
            const fallbackUsername = username || email_addresses[0].email_address.split("@")[0];

            const user = {
                clerkId: id!,
                email: email_addresses[0].email_address,
                username: fallbackUsername,
                firstName: first_name ?? "",
                lastName: last_name ?? "",
                photo: image_url,
            };

            const newUser = await createUser(user);
            return NextResponse.json({ message: "OK", user: newUser });
        }

        if (eventType === "user.updated") {
            const { image_url, first_name, last_name, username } = evt.data;

            const user = {
                firstName: first_name ?? "",
                lastName: last_name ?? "",
                username: username!,
                photo: image_url,
            };

            const updatedUser = await updateUser(id!, user);
            return NextResponse.json({ message: "OK", user: updatedUser });
        }

        if (eventType === "user.deleted") {
            const deletedUser = await deleteUser(id!);
            return NextResponse.json({ message: "OK", user: deletedUser });
        }

        console.log(`Webhook received: ${eventType} for ID ${id}`);
        console.log("Webhook payload:", evt.data);

        return new Response("Webhook received", { status: 200 });
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error verifying webhook", { status: 400 });
    }
}