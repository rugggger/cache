import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private cs: CacheService) {}
  @Put('/:id')
  Put(@Param('id') id: string, @Body() body: Object) {
    return this.cs.Put(id, body)
  }

  @Get('/:id')
  Get(@Param('id') id: string) {
    return this.cs.Get(id)
  }

  @Delete('/:id')
  Delete(@Param('id') id: string) {
    return this.cs.Delete(id)
  }

  @Get()
  GetState(@Query('page') page = 1) {
    return this.cs.GetCacheState(page)
  }
}
  