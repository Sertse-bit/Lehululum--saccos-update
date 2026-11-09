import { Globe, Mail, Phone, type LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  TelegramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons/BrandIcons";
import { organization as org } from "@/config/organization";

export type ChannelId = "phone" | "phone2" | "whatsapp" | "email" | "telegram" | "tiktok" | "website";

export interface ChannelDef {
  id: ChannelId;
  href: string;
  /** Text shown to the visitor: the number, e-mail address or handle. */
  display: string;
  /** Key of the call-to-action label under `common.contact`. */
  actionKey:
    | "callAction"
    | "whatsappAction"
    | "emailAction"
    | "telegramAction"
    | "tiktokAction"
    | "websiteAction";
  Icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  external: boolean;
}

/** Contact channels, all driven by `config/organization.ts`. */
export const channels: ChannelDef[] = [
  {
    id: "phone",
    href: org.links.phone,
    display: org.contact.phoneDisplay,
    actionKey: "callAction",
    Icon: Phone,
    external: false,
  },
  {
    id: "phone2",
    href: org.contact.phones[1].href,
    display: org.contact.phones[1].display,
    actionKey: "callAction",
    Icon: Phone,
    external: false,
  },
  {
    id: "whatsapp",
    href: org.links.whatsapp,
    display: org.contact.phoneDisplay,
    actionKey: "whatsappAction",
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    id: "email",
    href: org.links.email,
    display: org.contact.email,
    actionKey: "emailAction",
    Icon: Mail,
    external: false,
  },
  {
    id: "telegram",
    href: org.links.telegram,
    display: org.handles.telegram,
    actionKey: "telegramAction",
    Icon: TelegramIcon,
    external: true,
  },
  {
    id: "tiktok",
    href: org.links.tiktok,
    display: org.handles.tiktok,
    actionKey: "tiktokAction",
    Icon: TikTokIcon,
    external: true,
  },
];

if (org.website.href) {
  channels.push({
    id: "website",
    href: org.website.href,
    display: org.website.display,
    actionKey: "websiteAction",
    Icon: Globe,
    external: true,
  });
}

export function getChannel(id: ChannelId): ChannelDef {
  const channel = channels.find((c) => c.id === id);
  if (!channel) throw new Error(`Unknown channel: ${id}`);
  return channel;
}
