import { Model } from "../services/model";

export let CheckList = new Model("checklist", {
    checks: {
        collection: "check",
        via: "id",
        defaultsTo: []
    },

    activities: {
        collection: "activitylog",
        via: "modelId",
        defaultsTo: []
    },

    exceptions: {
        collection: "checkListException",
        required: false,
        defaultsTo: []
    },

    schedules: {
        collection: "schedule",
        required: false,
        defaultsTo: []
    },

    inProgress: {
        type: "boolean",
        defaultsTo: false
    },

    completed: {
        type: "boolean",
        defaultsTo: false
    },

    passed: {
        type: "boolean",
        defaultsTo: false
    }
});
