export function getNearestParentByNodeName(element: HTMLElement, nodeName: string): HTMLElement | null {
    while (element.parentElement && element.parentElement.nodeName !== nodeName) {
        element = element.parentElement;
    }

    return element.parentElement;
}