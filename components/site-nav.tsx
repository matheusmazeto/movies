"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavItem, navigation } from "@/config"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"

const SiteNav = () => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <NavigationMenu>
      <Link href="/" className="mr-4">
        <Icons.Logo className="size-6" />
      </Link>

      <NavigationMenuList className="hidden lg:flex">
        {navigation.items.map((item) =>
          item.items ? (
            <SiteNavItem
              key={item.title}
              isActive={isActive(item.href)}
              {...item}
            />
          ) : (
            <SiteNavItemSingle
              key={item.title}
              isActive={isActive(item.href)}
              {...item}
            />
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const SiteNavItem = ({
  title,
  icon,
  items,
  description,
  isActive,
}: NavItem & { isActive?: boolean }) => {
  const Icon = icon

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={cn(isActive && "bg-accent", "gap-1")}>
        <Icon className="mr-2 size-4" /> {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-6 pb-0">
          <Icon className="mr-1 inline size-4" /> {title}
          <p className="mt-2 text-sm">{description}</p>
        </div>
        <div className="grid w-[600px] grid-cols-2 p-4">
          {items?.map((item) => (
            <SiteNavListItem key={item.title} {...item} />
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const SiteNavItemSingle = ({
  title,
  icon,
  href,
  isActive,
}: NavItem & { isActive?: boolean }) => {
  const Icon = icon

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={href}
        className={cn(
          navigationMenuTriggerStyle(),
          isActive && "bg-accent",
          "gap-2"
        )}
      >
        <Icon className="mr-2 size-4" /> {title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const SiteNavListItem = ({ title, icon, description, href }: NavItem) => {
  const Icon = icon

  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="select-none space-y-2 rounded-md p-3 hover:bg-accent"
      >
        <div className="text-sm font-medium leading-none">
          <Icon className="mr-1 inline size-4" /> {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </Link>
    </NavigationMenuLink>
  )
}

export { SiteNav }