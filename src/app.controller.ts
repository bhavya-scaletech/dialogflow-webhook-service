import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  ping() {
    return { message: 'It works' };
  }
}
