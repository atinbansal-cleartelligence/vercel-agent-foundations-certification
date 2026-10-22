/**
 * This is where your agent will live.
 *
 * During the workshop you'll define a `ToolLoopAgent` here, give it a model
 * and instructions, and later add tools (web search, sandbox, etc.). The
 * route handler in `app/api/chat/route.ts` and the `useChat` call in
 * `components/agent-chat.tsx` will both import from this file.
 *
 * Workshop docs: https://agent-foundations-certification.vercel.app/docs/chat-agent
 */

import {
  ToolLoopAgent,
  type InferAgentUIMessage,
  type UIToolInvocation,
} from "ai";
import { searchProducts, getAllCategories, returnOrder,
  getProductDetails, } from "@/lib/tools";

export const shoppingAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5",
  instructions: `
You are a helpful assistant for the Vercel swag store.

Use searchProducts when:
- The user is browsing products
- The user wants recommendations
- The user asks what products are available
- The user is searching by category or keyword

Use getAllCategories when:
- The user asks what categories exist
- You need valid categories before searching

Use getProductDetails when:
- The user asks about a specific product
- The user wants more information about an item
- The user asks about availability, stock, images, sizing, or detailed product information
- A product has already been identified from search results

Always prefer getProductDetails over searchProducts when discussing a single specific product.

When the user wants to return an order, use the returnOrder tool. Ask for the order ID and reason if they haven't provided them. Example order IDs are 11111, 22222, and 33333.
`,

  tools: {
    searchProducts,
    getAllCategories,
    getProductDetails,
    returnOrder,
  },
});

export type ShoppingAgentUIMessage = InferAgentUIMessage<typeof shoppingAgent>;
export type SearchProductsToolInvocation = UIToolInvocation<typeof searchProducts>;
export type ProductDetailsToolInvocation = UIToolInvocation<typeof getProductDetails>;