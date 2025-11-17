/*
 * Copyright (c) 2025 Element Creations Ltd.
 *
 * SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
 * Please see LICENSE files in the repository root for full details.
 */

import React from "react";
import { type Meta, type StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { StatusBanner } from "./StatusBanner";

const meta = {
    title: "room/StatusBanner",
    component: StatusBanner,
    tags: ["autodocs"],
    args: {
        children: <p>Hello! This is a status banner.</p>,
        onClose: fn(),
    },
} satisfies Meta<typeof StatusBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Info: Story = {
    args: {
        type: "info",
    },
};
export const Critical: Story = {
    args: {
        type: "critical",
    },
};
