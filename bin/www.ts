#!/usr/bin/env node
"use strict";
import { Server } from '../src/Server';

let server = new Server();

export default server.app;