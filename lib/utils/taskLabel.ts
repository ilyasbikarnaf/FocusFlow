export function getStatusLabel(status: "done" | "todo" | "in_progress") {
  switch (status) {
    case "done":
      return { label: "Done", classes: "bg-green-900 text-green-300" };
    case "in_progress":
      return { label: "In Progress", classes: "bg-yellow-900 text-yellow-300" };
    case "todo":
      return { label: "Todo", classes: "bg-blue-900 text-blue-300" };
  }
}

export function getPriorityLabel(priority: "medium" | "high" | "low") {
  switch (priority) {
    case "high":
      return { label: "High", classes: "bg-red-900 text-red-300" };
    case "low":
      return { label: "Low", classes: "bg-gray-600 text-gray-300" };
    case "medium":
      return { label: "Medium", classes: "bg-blue-900 text-blue-300" };
  }
}
