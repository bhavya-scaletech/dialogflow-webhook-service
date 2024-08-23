import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class Env {
  @IsString()
  @IsNotEmpty()
  APP_NAME;

  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => +value)
  PORT: number;

  @IsString()
  @IsNotEmpty()
  FRONTEND_URL: string;

  @IsString()
  @IsNotEmpty()
  SWAGGER_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  SWAGGER_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  APP_URL: string;

  @IsString()
  @IsNotEmpty()
  DIALOG_FLOW_AGENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_SERVICE_ACCOUNT_PATH: string;
}
