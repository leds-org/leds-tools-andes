import { type Model } from '../language/generated/ast.js';
import { DocumentationApplication } from './documentation/application.js';
import { GenerateOptions } from './main.js';
import {ArtifactApplication} from './artifacts/application.js'
import {MadeApplication} from './made/application.js'
import { SparkApplication } from './spark/application.js';
import path from 'path';

export function generateJavaScript(model: Model, filePath: string, destination: string | undefined,opts: GenerateOptions): string {
    const final_destination  = extractDestination(filePath, destination);
    
    const documentationApplication = new DocumentationApplication(model,final_destination);
    const artifactApplication = new ArtifactApplication(model,final_destination);
    const madeApplication = new MadeApplication(model,final_destination); 
    const sparkApplication = new SparkApplication(model,final_destination);
    
    if (opts.only_Documentation){
        documentationApplication.create()
    
    }
    if (opts.only_spark){
        sparkApplication.create()
    }

    if (opts.only_testing){
        artifactApplication.create()
    }

    if (opts.only_made){
        madeApplication.create()
    }

    if (opts.all){
        documentationApplication.create();
        artifactApplication.create();
        madeApplication.create();
        sparkApplication.create()
    }
    
    
      
    
    
    
    
    return final_destination;
}

function extractDestination(filePath: string, destination?: string) : string {
    const path_ext = new RegExp(path.extname(filePath)+'$', 'g')
    filePath = filePath.replace(path_ext, '')
  
    return destination ?? path.join(path.dirname(filePath))
  }
  