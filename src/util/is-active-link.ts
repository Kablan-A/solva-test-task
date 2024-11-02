export function isActiveLink(pathname: string, linkTo: string): boolean {
  const pathSegments = pathname.split("/").filter(Boolean);
  // console.log("pathSegments: ", pathSegments);
  const linkSegments = linkTo.split("/").filter(Boolean);
  // console.log("linkSegments: ", linkSegments);

  return linkSegments.every(
    (segment, index) => segment === pathSegments[index]
  );
}
